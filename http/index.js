module.exports = function (context,req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var deviceName = process.env.HOSTNAME || process.env.COMPUTERNAME;
    
    var retMsg = "「Hello, " + (req.params.name) + "!」このデバイスの名前は " + deviceName+ " です。";
    retMsg += "EnvironmentVariableExample は「" + process.env.EnvironmentVariableExample + "」です。シークレットだったら戻さないでネ：）";
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: retMsg,
        headers: {
            "content-type": "text/plain:"
        }
    };
    context.done();
};