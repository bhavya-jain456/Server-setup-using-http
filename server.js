const { json } = require('express');
const http = require('http')
const port = 3000;
const bodyParser = require('body-parser');
let url=require('url');
const users=require('../sample2.json')
const server = http.createServer(async (req, res) => {

    if (req.method === 'GET') {
        res.statusCode = 200
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.write(JSON.stringify(users));
        res.end();
    }
    else if (req.method === 'POST') {
        
        let body = " "
        await req.on('data', (data) => {
            data = data.toString();
            body += data;
        });
       
        body = JSON.parse(body)
        let user={
            id:users.length+1, 
            first_name:body.first_name,
            gender:body.gender,
            status:body.status
        }
        users.push(user);
        req.on('end', () => {
    
            res.writeHead(200, {'Content-Type' : 'application/json'});
    
            res.write(JSON.stringify(user));
    
                res.end();
    
            
    
        });

    }
    else if (req.method === 'PUT') {
        let id=parseInt(req.url.slice(1))
        let bodys= " "
        await req.on('data', (data) => {
            data = data.toString();
            bodys += data;
        });
        body = JSON.parse(bodys)
            let first_name=body.first_name
           let gender=body.gender
            let status=body.status
            let index=users.findIndex((user)=>{
                return user.id==id
            })         
               let user
            if(index >= 0)
            { 
                 user=users[index]
                 user.first_name=first_name
                 user.gender= gender
                 user.status= status
            }
            req.on('end', () => {
    
                res.writeHead(200, {'Content-Type' : 'application/json'});
        
                res.write(JSON.stringify(user));
        
                    res.end();
        
                
        
            });
    }
    else if (req.method === 'DELETE') {
        let id=parseInt(req.url.slice(9))
        let index=users.findIndex((user)=>{
                    return user.id==id
                })         
                
                   let usr
                if(index >= 0)
                { 
                     user=users[index]
                    users.splice(index,1)
                }
               
                    res.writeHead(200, {'Content-Type' : 'application/json'});
            
                    res.write(JSON.stringify(user));
            
                        res.end();
                

    }
    else
    {
        res.writeHead(404, {'Content-Type' : 'text/json'});
            
            res.end("404 ERROR could not find that Page");
    }
})


server.listen(port, () => { console.log(`server is running at port ${port}`) })