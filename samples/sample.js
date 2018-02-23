import eusiNode from '../lib/index';

const eusi = eusiNode({
    bucketKey: '46e5945b-789d-4cc2-8a40-608612425226',
    // eslint-disable-next-line
    bucketSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWNrZXRfaWQiOiI0NmU1OTQ1Yi03ODlkLTRjYzItOGE0MC02MDg2MTI0MjUyMjYiLCJpZCI6IjU0MjBjYjA2LTRmMGYtNDMzMy1hODJhLTc5ZmFjMzU5YTU2ZSIsInRpbWVzdGFtcCI6MTUxNjYxMDU5NDc1Mn0.Li8Sb8v1CJnANDctUQumAQo90puBtNA3ywh4MmnxP-M'
});

// for anonymous access

eusi.getAccess().then((response) => {
    const eusiClient = eusi(response.token);
    eusiClient.get({
        type: 'blog'
    }).then(console.log);
});


// user registration
eusi
    .register({
        email: 'test@gmail.com',
        password: 'test',
        firstName: 'John',
        lastName: 'Doe'
    })
    .then(user => {
        const eusiClient = eusi(user.token);
        console.log(user);

        eusiClient.getByType('blog').then(console.log);

        eusiClient.getByName('Content 1').then(console.log);

        eusiClient.getByTaxonomyPath('news.sport.tennis').then(console.log);

        eusiClient.get({
            taxonomyPath: 'news.sport.table-tennis',
            type: 'News'
        }).then(console.log);

        eusiClient.getByField({
            maxAge: {
                $lt: 10
            },
            footerText: {
                $like: '%some text which resides inside the web page footer section%'
            }
        }).then(console.log);
    });


// passing token around for every endpoint call
eusi.login('test@gmail.com', 'test').then(user => {
    eusi.getByType('Template2', {
        token: user.token
    }).then(console.log);
    eusi.getByName('Content 1', {
        token: user.token
    }).then(console.log);
    eusi.getByField({
        code: {
            $like: '%some xml code for example%'
        }
    }, {
        token: user.token
    }).then(console.log);
});

// OR creating the instance once which will remember the passed token and expose the identical API
eusi.login('test@gmail.com', 'test').then(user => {
    const eusiClient = eusi(user.token);
    eusiClient.getByType('blog').then(console.log);
    eusiClient.getByName('My first blog').then(console.log);
    eusiClient.getByField({
        code: {
            $like: '%some xml code for example%'
        }
    }).then(console.log);
}).catch(() => {
    console.error('wrong user name or password');
});
