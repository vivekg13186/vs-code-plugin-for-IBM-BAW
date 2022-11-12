const ADDDED = "added";
const REMOVED = "removed";
const UPDATED = "updated";

function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function diff (oldRecords, newRecords) {
    if (!oldRecords && !newRecords) return null;
    oldRecords = oldRecords || [];
    newRecords = newRecords || [];
    oldRecords = clone(oldRecords);
    newRecords = clone(newRecords);
    let oldRecordsMap = {};
    let newRecordMap = {};
    oldRecords.map(i => { oldRecordsMap[i.id] = i; });
    newRecords.map(i => { newRecordMap[i.id] = i; });
    var diffNew = newRecords.filter(i => !oldRecordsMap[i.id]).map(i => {
        i.mode = ADDDED;
        return i;
    });
    var diffDeleted = oldRecords.filter(i => !newRecordMap[i.id]).map(i => {
        i.mode = REMOVED;
        return i;
    });
    var noChange = newRecords.filter(i => oldRecordsMap[i.id]);
    noChange.map(i => {
        var ov = oldRecordsMap[i.id];
        if (i.value !== ov.value) {
            i.mode = UPDATED;
            i.oldValue = ov.value;
           
        }else{
                i._children = diff(ov._children, i._children);
        }
    });
    var result = diffNew.concat(diffDeleted).concat(noChange);
    return result;
}