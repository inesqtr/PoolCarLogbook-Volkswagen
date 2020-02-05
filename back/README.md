Add you mysql credentials in a `keys.js` in the root folder:
```javascript
const keys = {
    MYSQL_PASSWORD: 'my-nice-password',
    MYSQL_USERNAME: 'root'
}

module.exports = keys;
```

Run the app locally:
```
yarn dev
```