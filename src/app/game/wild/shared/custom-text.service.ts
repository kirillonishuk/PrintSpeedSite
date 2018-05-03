import { Injectable } from "@angular/core"
import { CustomText } from "./custom-text.model";

@Injectable()
export class CustomTextService{
    data : CustomText[] = []

    checkForTextInArray() : Number{
        return this.data.length;
    }

    setCustomUsetText(customEdditedText : string[]){
        if(this.checkForTextInArray()){
            this.deleteCustomTextFromService();
        }
        let temporaryObject : CustomText = {
            userCustomText : customEdditedText
        }
        this.data.push(temporaryObject);
    }

    deleteCustomTextFromService(){
        this.data.splice(0, this.data.length);
    }

    getEdditTextForGame() : string[]{
        let numberOfWords = this.data.length;
        return this.data[numberOfWords - 1].userCustomText;
    }
}