# ramrs - the original qb stock list

## Introduction

ramrs is a grand list of quiz bowl (QB) "stock," or clues that frequently appear in QB questions and generally point to a single answer. The current database has ~60k clues (and growing!) and serves as a helpful study tool for players looking to win their next QB tournament.

## Project Details

The ramrs project is split into 4 repositories, each corresponding with a different step in generating the master list:

1. [packet-serializer](https://github.com/balusulapalemsaikoushik/packet-serializer): Download raw QB packets from the internet and serialize them into JSON format for use by downstream machine learning algorithms.
2. [clue-classifier](https://github.com/balusulapalemsaikoushik/clue-classifier): Infer labels for questions with missing categories (see repo for more information) and extract initial clues.
3. [ramrs-api](https://github.com/balusulapalemsaikoushik/ramrs-api): Pull clue data from the MongoDB backend and rank clues based on answer frequency for use by the main website.
4. (this repo): website hosting the full list of QB stock

## Frequently Asked Questions

### Where are QB packets downloaded from?

Question sets are downloaded off of the [High School Quizbowl Packet Archive](https://quizbowlpackets.com/) and parsed by a script that converts them into a more accessible format. ramrs is not affiliated with the Quizbowl Packet Archive or its partners and sponsors. For more information, go to the packet-serializer repo in the [Project Details](#project-details) section.

### How are clues extracted from QB questions?

The clue extraction process combines regular expression-based pattern matching and natural language processing steps. For more information, see the clue-classifier repo in the [Project Details](#project-details) section.

### How do we update clues?

We have a dedicated team of players that delete unnecessary clues and maintain existing ones to ensure that ramrs only contains pure "stock." More information can be found in the ramrs-api repo in the [Project Details](#project-details) section.

## Contributing

Right now, ramrs is still in its early stages, so modifications to the database can only be made by a group of select players. A more sophisticated process for suggesting updates to the list of clues will be implemented in a future update.

## Credits

Copyright &copy; 2025 Sai Koushik Balusulapalem
