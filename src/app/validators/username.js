var UsernameValidator = /** @class */ (function () {
    function UsernameValidator() {
    }
    // constructor(public webService: WebService) {
    // }
    UsernameValidator.prototype.checkUsername = function (control) {
        var _this = this;
        clearTimeout(this.debouncer);
        return new Promise(function (resolve) {
            _this.debouncer = setTimeout(function () {
                var webService;
                webService.checkUsername(control.value).subscribe(function (data) {
                    //console.log(data);
                    if (data.success == true) {
                        resolve({
                            "username taken": true
                        });
                    }
                    else {
                        resolve(null);
                    }
                }, function (err) {
                    resolve(null);
                });
            }, 1000);
        });
    };
    return UsernameValidator;
}());
export { UsernameValidator };
//# sourceMappingURL=username.js.map