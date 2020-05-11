class CustomTextInput{
    constructor(TextContainer){
        //DOM Node input element
        this.textContainer = TextContainer;
        //Inner width of container accounting for both side of padding; Possibly bad idea to floor this number;
        this.textContainer.innerWidth = 
        Math.floor(this.textContainer.clientWidth - 
        (parseFloat(window.getComputedStyle(this.textContainer).padding) * 2));
        this.textContainer.currentLine = 0;
        this.text = "";
        this.active = false;
        this.cursor;
        //Allowed keys
        this.alphabet = [
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
        this.punctuation = [
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
        this.numbers = [
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
        //Focus event listener that applies keydown listener if focus
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
        if(this.punctuation.includes(keyCode)){
            this.punctuation.forEach((punc) => {
                keyCode === punc? this.text += Event.key: "";
            })
        }else if(this.numbers.includes(keyCode)){
            this.numbers.forEach((number) => {
                keyCode === number? this.text += Event.key : "";
            })
        }else{
            //alphabet key
            this.alphabet.forEach((letter) => {
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