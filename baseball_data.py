#!/usr/bin/env python
from bs4 import BeautifulSoup
import requests
import re
import json

def fetch_html_body(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print("Failed to fetch HTML content. Status code:", response.status_code)
        return None

urlTeam = "https://www.mlb.com/team"

html_body = fetch_html_body(urlTeam)

teamData = []

if html_body:
    soupTeam = BeautifulSoup(html_body, 'html.parser')

    for team_card in soupTeam.find_all('div', {'class': lambda x: x and x == 'p-forge-list-item'}):
        team = {}
        print(team_card.prettify())
        team_id = team_card.get('id')
        team["id"] = team_id
        print(team_id)
        for team_content in team_card.find_all('div', {'class': lambda x: x and x == 'l-grid__content'}):
            for team_image in team_content.find_all('img'):
                image_source = re.search("\d+\.svg$", team_image.get('src')).group()
                team["img"] = image_source
                print(image_source)
            for team_name in team_content.find_all('h2'):
                name = team_name.get_text()
                team["name"] = name
                print(name)

        teamData.append(team)
    
    print(teamData)
else:
    print("Error")

urlSchedule = "https://www.mlb.com/schedule"
html_body = fetch_html_body(urlSchedule)

scheduleData = []
matchId = 1
if html_body:
    soupSchedule = BeautifulSoup(html_body, 'html.parser')
    for match_row in soupSchedule.find_all('div', {'data-mlb-test': lambda x: x and x == 'individualGameContainerDesktop'}):
        match = []
        for teams_cell in match_row.find_all('div', {'class': lambda x: x and 'DesktopTeamWrapper' in x}):
            match.append(teams_cell.text)
        for time in match_row.find_all('a', {'class': lambda x: x and 'gamedaylink' in x}):
            match.append(time.text)
        matchData = {}
        matchData['id'] = matchId
        matchData['awayTeam'] = match[0]
        matchData['homeTeam'] = match[1]
        matchData['date'] = '2024-04-23' if matchId < 16 else '2024-04-24' if matchId < 31 else '2024-04-25'
        matchData['time'] = match[2]
        scheduleData.append(matchData)
        matchId+=1

print(scheduleData)

output_data = {}
output_data['teams'] = teamData
output_data['schedule'] = scheduleData

file_path = "baseball_data.json"

with open(file_path, 'w') as json_file:
    json.dump(output_data, json_file)
