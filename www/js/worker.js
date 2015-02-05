importScripts('sql.js');

onmessage = function(message){

	postMessage(applyTransform(message.data.arraybuffer, message.data.sql));

	function applyTransform(result, sql)
	{
	    var data = [];
	    var uInt8Array = new Uint8Array(result);
	    var db = new SQL.Database(uInt8Array);
	    var stmt = db.prepare(sql);
	    while(stmt.step())
	    {
	        data.push(stmt.getAsObject())
	    }
	    db.close();
	    return data;
	}
}
