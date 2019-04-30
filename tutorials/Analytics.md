# Analytics Model

Analytics model is an extension of function analytics which serves to abstract fetching of data from analytics api end-point.

## Features offered by analytics model includes:

1. Eliminates need for jQuery library for manual fetching of analytics
2. Handles success and error reponses internally and accordingly
3. Removes a need to account for data structure of analytics api under operation.
4. Minimize the boiler plate codes need for the function
5. Impoves simplicity and readability of the codes
6. Introduce room for maintenance of function through separation of business logic and analytics logics.

# Analytics Use cases Examples

Below are examples of analytics use cases using function analytics and when not done by standard methods, such as use of jQuery.

## 1. Limit completeness to 100% Use case.

This example shows use of analytics model to write function function indicator and impose logic that limits completeness to 100%

### 1.1 Implementation with function analytics
```javascript
//Business Logic outside
function capTo100(results) {
    results.rows.forEach(function(resultRow,resultRowIndex){
        resultRow.forEach(function(rowValue,valueIndex){
            if(results.headers[valueIndex]["name"]=="value") {
                //Cap value to 100
                if(rowValue>=100) results.rows[resultRowIndex][valueIndex]=100;
            }
        });
    });
    return results;
}

//Fetching analytics & applying business logic
var analytics = new Fn.Analytics();
analytics.setData(parameters.rule.json.data+'.REPORTING_RATE')
    .setOrgUnit(parameters.ou).setPeriod(parameters.pe)
    .setParameters({"displayProperty":'SHORTNAME'}).postProcess(capTo100)
    .get().then(function (results) {
        parameters.success(results);
    }).catch(function (error) {
        parameters.error(error);
    });
```

### 1.2 Implementation with jquery

This is equivalent implementation with jquery, assuming jquery library exists and has been loaded into memory.
Below are draw-backs:

1. Requires jquery library to be imported into memory
2. Broken promises can crash and bring entire page to a grinding halt
3. Doesn't scale with more complex logics
4. Lacks all other advancements and heavy lifting done by function analytics

```javascript
//Business logic
function capTo100(results) {
    results.rows.forEach(function(resultRow,resultRowIndex){
        resultRow.forEach(function(rowValue,valueIndex){
            if(results.headers[valueIndex]["name"]=="value") {
                //Cap value to 100
                if(rowValue>=100) results.rows[resultRowIndex][valueIndex]=100;
            }
        });
    });
    return results;
}

$.ajax({
    url: "../../../api/analytics.json"
        +"?dimension=dx:"+ parameters.rule.json.data+".REPORTING_RATE"
        +"&dimension=pe:"+ parameters.pe 
        +"&dimension=ou:"+ parameters.ou
        +"&displayProperty=shortname",
	type: "GET",
	success: function(analyticsResults) {
        analyticResults = capTo100(analyticsResults);
		parameters.success(analyticsResults);
	},
	error:function(error){
		  parameters.error(error);
	}
});
```