


`npm install sequelize sequelize-cli pg --save-dev`

Create migration
```
npx sequelize-cli model:generate --name Guild --attributes name:string,icon:string,ownerId:string
```

Run Migration
```
npx sequelize-cli db:migrate --url 'postgresql://...'
```


Add to Server
`https://discord.com/api/oauth2/authorize?client_id=applicationId&permissions=2048&scope=bot%20applications.commands`