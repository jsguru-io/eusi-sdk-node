# eusi-sdk-node
The JS library acting as a wrapper around **EUSI** delivery API for NodeJS environment.

## Simple usage
``` js
const eusiNode = require('eusi-sdk-node');

    // both bucketKey and bucketSecret should be obtained form inside our eusi app under the settings tab
    const eusi = eusiNode({
	    bucketKey: '46e5945b-789d-4cc2-8a40-608612425226',
	    bucketSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWNrZXRfaWQiOiI0NmU1OTQ1Yi03ODlkLTRjYzItOGE0MC02MDg2MTI0MjUyMjYiLCJpZCI6IjU0MjBjYjA2LTRmMGYtNDMzMy1hODJhLTc5ZmFjMzU5YTU2ZSIsInRpbWVzdGFtcCI6MTUxNjYxMDU5NDc1Mn0.Li8Sb8v1CJnANDctUQumAQo90puBtNA3ywh4MmnxP-M'
    });

	// obtaining an anonymous access token
	// (in case you are not using our membership system or
	// you want a guest access)
    eusi.getAccess().then((response) => {
        eusi.getById('44e8c09b-ed9e-4424-99e0-2de60adafa01', {
            token: response.token
        }).then(console.log);
    });
```

## Fetching content

### by id

``` js
eusi.getById('44e8c09b-ed9e-4424-99e0-2de60adafa01', { token });
```

### by content type (aka template name)7

``` js
eusi.get({
    type: 'blog'
}, { token })
    .then(result...
```
or

``` js
eusi.getByType('blog', { token })
    .then(result...
```

### by content name

``` js
eusi.get({ name: ''}, { token }).then(result...
```
or
``` js
eusi.getByName('Aussie open - first round', { token })
    .then(result...;
```

### by taxonomy id

``` js
eusi.get({
    taxonomyId: '99e5945b-789d-4ac2-8a40-60861542777'
}).then(result...
```
or
``` js
eusi.getByTaxonomyId('99e5945b-789d-4ac2-8a40-60861542777').then(result...
```

### by taxonomy name
``` js
eusi.get({
    taxonommyName: 'sport-news'
}, { token })
    .then(...
```
or
``` js
eusi.getByTaxonomyName('sport-news', { token }).then(...
```

### by taxonomy path
``` js
eusi.get({
    taxonommyPath: 'sport-news.tennis.ao` // you can find the full path of every taxonomy item under taxonomy tab inside eusi app
}, { token }).then(...
```
or
``` js
eusi.getByTaxonomyPath('sport-news.tennis.ao').then(...
```

### by field
NOTE: currently we support searching only by textual fields
``` js
eusi.get({
    field: {
        'responsible-scientist': 'Nikola Tesla`,
    }
}, { token }).then(res => {
  console.log(res);
  // prints out all the content which have field key `responsible-scientis` with the value `Nikola Tesla`
});
```
or
``` js
eusi.getByField({
  'responsible-scientist': 'Nikola Tesla'
}), { token }).then(res => {
  console.log(res);
  // prints out all the content which have field key `responsible-scientis` with the value `Nikola Tesla`
});
```
or you can search for a match by providing multiple field queries
``` js
eusi.getByField({
     'responsible-scientist': 'Nikola Tesla',
     'location': 'New York`
}, { token }).then(result => {
    console.log(result);
    // prints out all the content which have field `responsible-scientist` with the value `Nikola Tesla` and
    // which have at the same time `location` field with the value `New York`
});
```

## Advanced querying
Our API provides you with an easy and elegant interface to make more complex queries.
Instead of passing simple string to every method from above, you can pass a query object.
We support these operators: **$like**, **$between**, **$in** and by default for multiple query object props logical AND operator is used.

### $like
Matches substrings (works the same as SQL LIKE operator)
``` js
eusi.getByField({
     'responsible-scientist': {
        location: 'New%
     },
}, { token }).then(result => {
    console.log(result);
    // prints out all the content which have field `location` which value starts with 'New`
});

// You can combine queries with any number of quearible fields
eusi.get({
    name: {
        $like: 'Today%'
    },
    taxonomyPath: {
        $like: 'news.%'
    },
}).then(.../ fetches all the content which name starts with 'Today` and which has any taxnomy which is a descendant of taxonomy `news`
```
NOTE: When using $like operator there is no case sensitivity

### $between
Matches interval