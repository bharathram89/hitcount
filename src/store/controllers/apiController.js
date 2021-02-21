class ApiController{
    constructor(){
        this.MAX_ATTEMPT = 2;
        this.call = (apiCall = () => false, onComplete = () => false ,attempt = 0) => {
            console.log(`>Call ${attempt}`)
            apiCall()
                .then(res => {
                    console.log(">CALL:THEN");
                    console.log(res);
                    if(!res.success){
                        if(attempt < this.MAX_ATTEMPT){
                            this.call(apiCall, onComplete ,attempt+1);
                        }else{
                            onComplete(res.error.message, null)
                        }
                    }else{
                        onComplete(null, res);
                    }
                }).catch(err => {
                    console.log(">CALL:CATCH")
                    console.log(err);
                    if(attempt < this.MAX_ATTEMPT){
                        this.call(apiCall, onComplete ,attempt+1);
                    }else{
                        onComplete(err.error.message, null  )
                    }
                })
        }
    }
}
const MyApiController = new ApiController();
export default MyApiController;