
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('optimizations.db');

async function storeOptimization() {

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS optimizations (info TEXT)");
    
        var stmt = db.prepare("INSERT INTO optimizations VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();
    
        db.each("SELECT rowid AS id, info FROM lorem", function(err: any, row: any) {
            console.log(row.id + ": " + row.info);
        });
    });
    
    db.close();
}