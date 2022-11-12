function new_id () {
    var num = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    return `id_${num}`;
}
exports.new_id = new_id;