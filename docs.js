const level  = require("level");
  
const os = require('os');
var path = require('path');

console.log(path.join(os.homedir(),"baw_test"));

var  db  = null;

  async function setDatabase(context){
 
    db =new level.Level(path.join(os.homedir(),"baw_test"),{ valueEncoding: 'json' })
    await  db.put("dedfausdkjf",'{"hrllo" : "asdasd"}')
}


  function putDoc(key,data)
{
    if(db){
        db.put(key,JSON.stringify(data));
    }
}

  async function getDoc(key){
    if(db){
        var data  = await db.get(key);
        if(data) return JSON.parse(data);
    }
    return undefined;
}

async function getKeys(){
    var result=[];
    if(db){
        
        for await (const key of db.keys()) {
            result.push(key);
          }
    }
    return result;
}

exports.getKeys=  getKeys;
exports.setDatabase = setDatabase;