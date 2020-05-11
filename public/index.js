class CustomTextInput{
    constructor(TextContainer){
        //DOM Node input element
        this.textContainer = TextContainer;
        this.text = "";
        this.active = false;
        this.cursor;
        //Allowed keys
        this.acceptedAlphabet = [
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
        ];
        this.acceptedPunctuation = [
            ` `,
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
        ];
        this.acceptedNumbers = [
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
        ];
        this.textContainer.addEventListener("focus", (Event) => {
            this.textContainer.textContent = this.text;
            this.active = true;
            this.cursor = this.addCursor(this.textContainer);
            this.textContainer.addEventListener("keydown", this.keylogger);
        })
        this.textContainer.addEventListener("blur", (Event) => {
                this.active = false;
                this.removeCursor();
                this.textContainer.removeEventListener("keydown", this.keylogger);
        })
    }
    keylogger = (Event) => {
        let keyCode = Event.key.toLowerCase();
        //backspace key
        keyCode === "backspace" && this.text ? this.text = this.text.substring(0,this.text.length-1) : "";
        //punctuation key
        if(this.acceptedPunctuation.includes(keyCode)){
            this.acceptedPunctuation.forEach((punc) => {
                keyCode === punc? this.text += Event.key: "";
            })
        }else if(this.acceptedNumbers.includes(keyCode)){
            this.acceptedNumbers.forEach((number) => {
                keyCode === number? this.text += Event.key : "";
            })
        }else{
            //alphabet key
            this.acceptedAlphabet.forEach((letter) => {
                if(keyCode === letter){
                    this.text += Event.key;
                }
            })
        }
        this.textContainer.textContent = this.text;
    }
    addCursor = () => {
        if(document.activeElement === this.textContainer){
            this.textContainer.classList.add("cursor");
        }
        this.cursor = setInterval(() => {
            if(this.textContainer === document.activeElement){
                this.textContainer.classList.toggle("cursor");
            }else{
                this.removeCursor();
            }
        }, 1000);
        return this.cursor;
    }   
    removeCursor = () => {
        this.textContainer.classList.remove("cursor");
        clearInterval(this.cursor);
    }
}

let cInput = new CustomTextInput(document.querySelector(".text-input"));