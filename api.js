const axios = require('axios').default;
const vscode = require("vscode");
function report(res){
    if (res.status == 403){
       vscode.window.showErrorMessage("403:Not authorised to perform this action");
    }else if(res.status ==500){
        vscode.window.showErrorMessage("500:Internal error occured");
    }
}

async function getProcessInstanceDetails(host ,username,password,instanceid){
    try {
        var res = await axios({
            method: "get",
            url: `/rest/bpm/wle/v1/process/${instanceid}?parts=all`,
            baseURL: host,
            auth: { username, password }
        });
        report(res);
        return res.data.data;
    } catch (e) {
        return null;
    }
}

exports.getProcessInstanceDetails = getProcessInstanceDetails;

async function getProcessApps (host, username, password) {
    try {
        var res = await axios({
            method: "get",
            url: "/rest/bpm/wle/v1/processApps",
            baseURL: host,
            auth: { username, password }
        });
        report(res);
        return res.data.data.processAppsList;
    } catch (e) {
        return null;
    }

}
exports.getProcessApps = getProcessApps;

async function getToolkits (host, username, password) {
    try {
        var res = await axios({
            method: "get",
            url: "/rest/bpm/wle/v1/toolkit",
            baseURL: host,
            auth: { username, password }
        });
        report(res);
        return res.data.data.processAppsList;
    } catch (e) {
        return null;
    }

}
exports.getToolkits = getToolkits;
async function getProcessAppSettings (host, username, password, id) {
    try {
        var res = await axios({
            method: "get",
            url: "/rest/bpm/wle/v1/processAppSettings",
            baseURL: host,
            auth: { username, password },
            params: {
                snapshotId: id,
                recurse: "true"
            }
        });
        report(res);
        return res.data.data;
    } catch (e) {
        return null;
    }

}
exports.getProcessAppSettings = getProcessAppSettings;

async function getToken (host, username, password) {
    try {
        var res = await axios({
            method: "post",
            url: "/ops/system/login",
            baseURL: host,
            auth: { username, password },
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "refresh_goups": true,
                "requested_lifetime": 7200
            }
        });
        report(res);
        return res.data.csrf_token;
    } catch (e) {
        return null;
    }

}

async function getEPVs (host, username, password, containerId, versionId) {
    try {
        var res = await axios({
            method: "get",
            url: `ops/std/bpm/containers/${containerId}/versions/${versionId}/epvs`,
            baseURL: host,
            auth: { username, password },
            headers: {
                "BPMCSRFToken": await getToken(host, username, password)
            }
        });
        report(res);
        return res.data.epvs;
    } catch (e) {
        return null;
    }

}
exports.getEPVs = getEPVs;

async function getOrphanedToolkits(host, username, password,containerId) {
    try {
        var res = await axios({
            method: "get",
            url: `/ops/std/bpm/containers/${containerId}/orphaned?optional_parts=version_details`,
            baseURL: host,
            auth: { username, password },
            headers: {
                "BPMCSRFToken": await getToken(host, username, password)
            }
        });
        report(res);
        return res.data.orphaned_toolkits;
    } catch (e) {
        return null;
    }

}
exports.getOrphanedToolkits = getOrphanedToolkits;

async function getENVs (host, username, password, containerId, versionId) {
    try {
        
        var res = await axios({
            method: "get",
            url: `ops/std/bpm/containers/${containerId}/versions/${versionId}/env_vars`,
            baseURL: host,
            auth: { username, password },
            headers: {
                "BPMCSRFToken": await getToken(host, username, password)
            }
        });
        report(res);
        return res.data.pairs;
    } catch (e) {
       
        return null;
    }

}
exports.getENVs = getENVs;
async function getRESTServers (host, username, password, containerId, versionId) {
    try {
        var res = await axios({
            method: "get",
            url: `ops/std/bpm/containers/${containerId}/versions/${versionId}/servers/rest`,
            baseURL: host,
            auth: { username, password },
            headers: {
                "BPMCSRFToken": await getToken(host, username, password)
            }
        });
        report(res);
        return res.data.rest_server_definitions;
    } catch (e) {
        
        return null;
    }

}
exports.getRESTServers = getRESTServers;
async function getTeamBindings (host, username, password, containerId, versionId) {
    try {
        var res = await axios({
            method: "get",
            url: `ops/std/bpm/containers/${containerId}/versions/${versionId}/team_bindings`,
            baseURL: host,
            auth: { username, password },
            headers: {
                "BPMCSRFToken": await getToken(host, username, password)
            }
        });
        report(res);
        return res.data.team_bindings;
    } catch (e) {
        return null;
    }

}
exports.getTeamBindings = getTeamBindings;

async function genericVersionAction (host, username, password, containerId, versionId,action){
    try {

        var res = await axios({
            method: "post",
            url: `ops/std/bpm/containers/${containerId}/versions/${versionId}/${action}`,
            baseURL: host,
            auth: { username, password },
            headers: {
                "BPMCSRFToken": await getToken(host, username, password)
            }
        });
        report(res);
    } catch (e) {

        
    }
}

 
exports.makeVersionDefault = async function  (host, username, password, containerId, versionId) {
    await genericVersionAction(host, username, password, containerId, versionId,'make_default')
};
exports.makeVersionActive = async function  (host, username, password, containerId, versionId) {
    await genericVersionAction(host, username, password, containerId, versionId, 'activate')
};
 
exports.makeVersionArchive = async function  (host, username, password, containerId, versionId) {
    await genericVersionAction(host, username, password, containerId, versionId, 'archive')
};
exports.makeVersionRestore = async function  (host, username, password, containerId, versionId) {
    await genericVersionAction(host, username, password, containerId, versionId, 'restore')
};
exports.makeVersionDeActivate = async function  (host, username, password, containerId, versionId) {
    await genericVersionAction(host, username, password, containerId, versionId, 'deactivate')
};
 