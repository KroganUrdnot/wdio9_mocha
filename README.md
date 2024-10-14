## Overview

This is a WedriverI0 + Mocha based setup utilising the POM (Page Object) method  for different pages from application under test.
 The BrowserUtils namespace combines the actions to interact with Page Objects AKA facade design patter.

## Project Structure

- **`/test/specs`**: Contains the test spec file
- **`/src/`**: Contains the page objects
- **`wdio.conf.ts`**: Test runner config

## Prerequisites

- Node installation
- Java installation for generating report

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/KroganUrdnot/wdio9_mocha.git
   npm run wdio
   npm run report