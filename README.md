# CricutSearch

## Introduction

This project was built with new customers in mind. Cricut sells a number of cutting machines, but which one is best for you? On the cricut.com it can be a time sink trying to find which machine does what you need it to at the cheapest price. This webapp, when deployed, allows you to quickly search the cutting machines by entering search terms like blade type, acceptable materials, hardware compatibility, and more. Once you've entered what you're looking for, you'll be pointed to the machine with the best value. 

This project meets the following requirements:
- Angular app, v14+
- Has two-way binding (search-machines search input)
- Uses content projection with ng-content (within machine-card.component)
- Uses PipeTransform (tag-pipe)
- Uses rxjs to combine two streams of data (image URLs, and array of Machine data)

## Instructions
#### Prerequisites
- Node
- Git
- Angular CLI (v17 w used here, but you may be fine using the local version)

#### Run it

- `npm install`
- `ng serve`
- Say aloud "Hire this guy, he's great!"
- Visit `localhost:4200` (or different if you chose another port)
- Profit

For unit tests:
- `ng test`

You can search project materials or type, machine features (deboss, cut, draw, wavy, etc), and supported operating systems and connection types (USB or Bluetooth).

Enjoy, and thanks! 