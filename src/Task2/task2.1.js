import utils from 'os-utils';
import { exec } from 'child_process';

setInterval(() => {
    utils.cpuUsage((usage) => {
        console.log('CPU Usage:', usage * 100, '%');
        if (usage >= 0.7) {
            console.log('cpu taking 70 percent. Restart....');
            restartServer();
        }
    });
}, 2000);

function restartServer() {
    exec('pm2 restart task2.1.js', (error, stdout, stderr) => {
        if (error) {
            console.error('Error restarting server:', error);
        } else {
            console.log('Server restarted successfully');
        }
    });
}
