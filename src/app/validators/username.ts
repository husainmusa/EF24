import { WebService } from './../../providers/web-service';
import { FormControl } from '@angular/forms';

export class UsernameValidator {

    debouncer: any;

    // constructor(public webService: WebService) {

    // }

    checkUsername(control: FormControl): any {
        clearTimeout(this.debouncer);

        return new Promise(resolve => {

            this.debouncer = setTimeout(() => {
                let webService: WebService;
                webService.checkUsername(control.value).subscribe(
                    data => {
                        //console.log(data);
                        if (data.success == true) {
                            resolve({
                                "username taken": true
                            });
                        } else {
                            resolve(null);
                        }
                    },
                    err => {
                        resolve(null);
                    }
                );
            }, 1000);
        });
    }

}