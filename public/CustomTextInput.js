export class CustomTextInput{
    constructor(TextInput){
        //DOM Node input element
        this.textInput = TextInput;
        //Must needed textInput 
        this.textInput.style.wordWrap = "break-word";
        this.textInput.style.cursor = "text";

        this.text = "";
        this.active = false;
        this.cursor;
        //Allowed keys
        this.allowedKeys = {
            alphabet: [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z"
            ],
            mixed: [
                `.`,
                `,`,
                `;`,
                `:`,
                `'`,
                `"`,
                `/`,
                `?`,
                `(`,
                `)`,
                `!`,
                `@`,
                `#`,
                `$`,
                `&`,
                `%`,
                `-`
            ],
            numbers: [
                `1`,
                `2`,
                `3`,
                `4`,
                `5`,
                `6`,
                `7`,
                `8`,
                `9`,
                `0`,
            ]
        }
        
        this.textInput.addEventListener("focus", (Event) => {
            this.textInput.textContent = this.text;
            this.active = true;
            this.cursor = this.addCursor(this.textInput);
            this.textInput.addEventListener("keydown", this.keyDownEvent);
        })
        this.textInput.addEventListener("blur", (Event) => {
                this.active = false;
                this.removeCursor();
                this.textInput.removeEventListener("keydown", this.keyDownEvent);
        })
    }
    keyDownEvent = (Event) => {
        this.keylogger(Event);
        this.autoScrollToBottom();
    }
    
    keylogger = (Event) => {
        let keyCode = Event.key.toLowerCase();
        //backspace key
        keyCode === "backspace" && this.text ? this.text = this.text.substring(0,this.text.length-1) : "";
        //space key (prevent double space)
        keyCode === " " && this.text[this.text.length-1] != " "? this.text += " " : "" 
        //punctuation key
        if(this.allowedKeys.mixed.includes(keyCode)){
            this.allowedKeys.mixed.forEach((punc) => {
                keyCode === punc? this.text += Event.key: "";
            })
        }else if(this.allowedKeys.numbers.includes(keyCode)){
            this.allowedKeys.numbers.forEach((number) => {
                keyCode === number? this.text += Event.key : "";
            })
        }else{
            //alphabet key
            this.allowedKeys.alphabet.forEach((letter) => {
                if(keyCode === letter){
                    this.text += Event.key;
                }
            })
        }
        this.textInput.textContent = this.text;
    }

    autoScrollToBottom = () => {
        this.textInput.scrollTop = this.textInput.scrollHeight
    }

    addCursor = () => {
        if(document.activeElement === this.textInput){
            this.textInput.classList.add("cursor");
        }
        this.cursor = setInterval(() => {
            if(this.textInput === document.activeElement){
                this.textInput.classList.toggle("cursor");
            }else{
                this.removeCursor();
            }
        }, 1000);
        return this.cursor;
    }   
    removeCursor = () => {
        this.textInput.classList.remove("cursor");
        clearInterval(this.cursor);
    }
}