(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <p>Date Format</p>
        <select id="select" style="width: 100%; padding: 3px 5px; font-family: "72" sans-serif;>
            <option name="aps_format" value="">Automatic</option>
            <option name="aps_format" value="YYYY-MM-dd">YYYY-MM-DD</option>
            <option name="aps_format" value="MM/dd/YYYY">MM/DD/YYYY</option>
            <option name="aps_format" value="dd.MM.YYYY">DD.MM.YYYY</option>
        </select>
        <p>Miscellaneous</p>
        <input type="checkbox" id="range" /><label for="checkbox">Enable date range selection</label>
    `;

    class DatePickerAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            ["select", "range"].forEach(id =>
                this._shadowRoot.getElementById(id).addEventListener("change", this._submit.bind(this)));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        format: this.format,
                        enablerange: this.enablerange
                    }
                }
            }));
            return false;
        }

        get format() {
            return this._shadowRoot.querySelector("option[name='aps_format']:checked").value;
        }

        set format(value) {
            this._shadowRoot.querySelector("option[name='aps_format'][value='" + value + "']").checked = "checked";
        }

        get enablerange() {
            return this._shadowRoot.querySelector("#range").checked;
        }

        set enablerange(value) {
            this._shadowRoot.querySelector("#range").checked = value
        }
    }

    customElements.define('com-sap-date-picker-aps', DatePickerAps);
})();