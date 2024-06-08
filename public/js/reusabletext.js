


class TestCustomElement extends HTMLElement {

    constructor() {
        super(); // always call first !!

        // create and attach a new shadow DOM to the element
        console.log("created custom element")
        this.shadow = this.attachShadow({mode:"open"});

        // we define the appearence of our customElement by setting it's shadow DOM innerHTML property
        this.shadow.innerHTML = `<style>
            .container {
                width:fit-content;
                display:inline-block;
                padding-top:0px;
                padding-bottom:0px;
                margin-top: 0px;
                margin-bottom:0px;
            }

 span {
                padding:0px;
                margin:0px;
            }

            ul{
               margin: 0px;
               padding: 0px;
               padding-left: 1em;  /* Set the distance from the list edge to 1x the font size */
            }

            ol {
                margin: 0px;
                padding: 0px;
                padding-left: 1em; /* Set the distance from the list edge to 1x the font size */
            }

            li {
                padding-bottom: 0.5em;
                font-size: 16px;
            }

            p {
            margin: 0px;
            padding: 0px;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
            font-size: 16px;
            }

        </style>

        <div class="container">

          <span>

            <p style="padding-left: 0px;">Gain verbal agreement in principle before proceeding. Explain:</p>
            <ol>
             <li>Taking part in research is likely to improve the quality of their care</li>
             <li>Risks are carefully controlled - research is safe</li>
             <li>Explain the uncertainty that exists with respect to treatment of <i>their</i> condition;</li>
             <li>If they change their mind they can withdraw their participation at any point</li>

            </ol>


             </ol>
          </span>
        </div>`;

       // here you put the functionalities
    }

    // here you put the callbacks
}

customElements.define("test-custom-el", TestCustomElement);



