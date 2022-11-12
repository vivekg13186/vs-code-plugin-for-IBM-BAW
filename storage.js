
async function findConnection (context, name) {

    var connections = await getConnections(context);
    for (var i = 0; i < connections.length; i++) {
        var c = connections[i];
        if (c.connectionName == name) {
            var result = {
                host: c.host,
                username: c.username,
                password: await getPaswordForConnection(context, c)
            };
             
            return result;
        }

    }
    return null;

}
async function getConnections (context) {
    return await context.globalState.get("baw.app.support.envs") || [];
}
async function putConnections (context, connections) {
    await context.globalState.update("baw.app.support.envs", connections);
}

function getPasswordKey (c) {
    return `${c.connectionName}.${c.host}.${c.username}`;
}

async function getPaswordForConnection (context, c) {
    var key = getPasswordKey(c);
    return await context.secrets.get(key);
}

async function updateConnection (context, connectionName, host, username, password) {
    var c = { connectionName, host, username };
    await context.secrets.store(getPasswordKey(c), password);
    var connections = await getConnections(context);
    connections.push(c);
    await putConnections(context, connections);
}

async function deleteConnection (context, connectionName) {
    var connections = await getConnections(context);
    var c = connections.filter(i => i.connectionName == connectionName);
    if (!c) return;
    var key = getPasswordKey(c);
    await context.secrets.delete(key);
    await putConnections(context, connections.filter(i => i.connectionName != connectionName));
}


async function deleteAllConnections (context) {
    var connections = await getConnections(context);
    for (var i = 0; i < connections.length; i++) {
        var key = getPasswordKey(connections[i]);
        await context.secrets.delete(key);
    }

    await putConnections(context, []);
}



exports.findConnection = findConnection;
exports.getConnections = getConnections;

exports.putConnections = putConnections;
exports.deleteConnection = deleteConnection;
exports.updateConnection = updateConnection;

exports.getPaswordForConnection = getPaswordForConnection;
exports.deleteAllConnections = deleteAllConnections;