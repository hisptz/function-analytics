# Fn
[![Build Status](https://travis-ci.org/hisptz/function-analytics.svg?branch=develop)](https://travis-ci.org/hisptz/function-analytics) [![Greenkeeper badge](https://badges.greenkeeper.io/hisptz/function-analytics.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/18d9239d0ecb464fbea6/maintainability)](https://codeclimate.com/github/hisptz/function-analytics/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/18d9239d0ecb464fbea6/test_coverage)](https://codeclimate.com/github/hisptz/function-analytics/test_coverage)

# Function Analytics Library

Library to aid in the development of functions. Built with best practices in mind from the experience on function maintenance.
This is to make it easy for developers to concentrate on the business logic of their functions while also considering the best way
to perform operations with out of the box performance execution strategy.

## Features

- Fetching data for analytics.
- Fetching DHIS Identifiable objects.
- Perform execution of functions with optimization

## Getting started

### Browser

```
<script src="https://raw.githack.com/hisptz/function-analytics/master/lib/function-analytics.min.js"></script>
```

### Node

```
var Fn = require('function-analytics').Fn;
```

## Initializing

```js
Fn.init({
  baseUrl: 'api_url_to_dhis_server',
  username: 'username', //Optional if in a DHIS app
  pasword: 'password' //Optional if in a DHIS app
});
```

## Fetch analytics

You can fetch analytic with a few lines of code

```js
new Fn.Analytics()
  .setData('dx')
  .setOrgUnit('ou')
  .setPeriod('pe')
  .postProcess(function(analyticsObject) {
    // This adds post processing after fetching is done
    var ouHeader = analyticsObject.headers.ou; // Gets the ou header
    var ouIndex = ouHeader.index; // Gets the index of organisation unit header
    return analyticsObject;
  })
  .get()
  .progress(function(value) {
    // Do something with the progress value
  })
  .then(function(analyticsObject) {
    //The result after fetching and processing with the post process callback
  });
```

## Dependency

You can put together dependencies if calls depend on one another

```js
var orgunit = new Fn.OrganisationUnit(); // Example of an organisation fetcher

orgunit.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);
//Declare business process to run after orgunit results
var bussinessAfterOrgunitProcess = (orgUnitResult, analytics) => {
    // Adds dependency
    let ous = orgUnitResult.organisationUnits
      .map(organisationUnit => {
        return organisationUnit.id;
      })
      .join(';');

    analytics.setPeriod('2016').setOrgUnit(ous);
  }
var analytics = new Fn.Analytics();

analytics.preProcess(
  new Fn.Dependency(orgunit, bussinessAfterOrgunitProcess)
);
analytics.get().then(results => {});
```

## Multiple Processing

You can invoke multiple processes

```js
var orgunit = new Fn.OrganisationUnit();

orgunit.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

var analytics = new Fn.Analytics();

analytics.setPeriod('2016').setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

var multiProcesses = Fn.all([orgunit, analytics]);
multiProcesses.postProcess(res => {
  //res[0] is from orgunit
  //res[1] is from analytics
  return [res[1], res[0]];
});
multiProcesses.get().then(results => {});
```
For detailed documentation please visit [our documentation](https://hisptz.github.io/function-analytics/).