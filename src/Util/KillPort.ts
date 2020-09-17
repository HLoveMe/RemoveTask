
var exec = require('child_process').exec;

export default function KillPort(port: number = 8486) {
  return new Promise((resolve, reject) => {
    var order = `lsof -i:${port}`
    exec(order, function (err, stdout, stderr) {
      if (err) { resolve(); return console.log(err); }
      stdout.split('\n').filter(function (line: string, index: number, arr: any[]) {
        var p = line.trim().split(/\s+/);
        var address = p[1];
        if (address != undefined && address != "PID") {
          exec('kill ' + address, function (err, stdout, stderr) {
            index == arr.length - 1 && resolve();
          });
        }
      });
    });
  })
}