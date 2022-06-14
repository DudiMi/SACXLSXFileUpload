(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
        .datePicker {
            margin: 0;
        }

        .datePicker .sapMInputBaseContentWrapper {
            border-color: transparent;
        }
    </style>
    
    `;

    class DatePicker extends HTMLElement {
        constructor() {
            super();
            this.init();
        }

        init() {
            if (this.children.length === 2) return; //constructor called during drag+drop
            
            var ctor = sap.m.DatePicker;
            if (this._enablerange) { ctor = sap.m.DateRangeSelection; }
            this.DP = new ctor({
                change: function () {
                    this.fireChanged();
                    this.dispatchEvent(new Event("onChange"));
                }.bind(this)
            }).addStyleClass("datePicker");
            this.DP.placeAt(this);
            this.DP.setDisplayFormat("YYYY-MM-dd");
        }

        fireChanged() {
            var properties = { dateVal: this.DP.getDateValue() };
            if (this._enablerange) { properties.secondDateVal = this.DP.getSecondDateValue(); }
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        setDisplayFormat(value) {
            if (!this.DP) return;
            this.DP.destroy();
            this.init();
            this.DP.setDisplayFormat(value);
        }


        getDateFormat() {
            let date = new Date(this.DP.getDateValue());
            let day = date.getDate();
            let dayStr = (day < 10) ? '0' + day : day;
            let month = date.getMonth() + 1;
            let monthStr = (month < 10) ? '0' + month : month;
            let year = date.getFullYear();

            let str = `${year}${monthStr}${dayStr}`;
            return str;
        }

        getYear() {
            let date = new Date(this.DP.getDateValue());
            let year = date.getFullYear();
            
            return `${year}`;
        }

        getMonth() {
            let date = new Date(this.DP.getDateValue());
            let month = date.getMonth() + 1;
            let monthStr = (month < 10) ? '0' + month : month;
            
            return `${monthStr}`;
        }

        getDay() {
            let date = new Date(this.DP.getDateValue());
            let day = date.getDate();
            let dayStr = (day < 10) ? '0' + day : day;
            
            return `${dayStr}`;
        }

        getSecondDateFormat() {
            if(this._enablerange) {
                let date = new Date(this.DP.getSecondDateValue());
                let day = date.getDate();
                let dayStr = (day < 10) ? '0' + day : day;
                let month = date.getMonth() + 1;
                let monthStr = (month < 10) ? '0' + month : month;
                let year = date.getFullYear();
    
                let str = `${year}${monthStr}${dayStr}`;
                return str;
            }
            return undefined;
        }

        getSecondYear() {
            if(this._enablerange) {
                let date = new Date(this.DP.getSecondDateValue());
                let year = date.getFullYear();
            
                return `${year}`;
            }
            return undefined;
        }

        getSecondMonth() {
            if(this._enablerange) {
                let date = new Date(this.DP.getSecondDateValue());
                let month = date.getMonth() + 1;
                let monthStr = (month < 10) ? '0' + month : month;
                
                return `${monthStr}`;
            }
            return undefined;
        }

        getSecondDay() {
            if(this._enablerange) {
                let date = new Date(this.DP.getSecondDateValue());
                let day = date.getDate();
                let dayStr = (day < 10) ? '0' + day : day;
                
                return `${dayStr}`;
            }
            return undefined;
        }

        set dateVal(value) {
            if (value == undefined || !this.DP) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setDateValue(value);
        }

        set secondDateVal(value) {
            if (value == undefined || !this.DP || !this._enablerange) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setSecondDateValue(value);
        }

        set format(value) {
            if (!this.DP) return;
            this.DP.setDisplayFormat(value);
        }

        set enablerange(value) {
            if (value == undefined || !this.DP) return;
            this._enablerange = value;
            this.DP.destroy();
            this.init();
        }
    }

    customElements.define('com-sap-date-picker', DatePicker);
})();

/*

API Documentation

Method Summary

setDisplayFormat(): String
set the display date format exm: YYYY-MM-dd

getDateFormat(): String
get the date string YYYYMMDD. (start date if range selection is enabled)

getYear(): string
get the date string format YYYY. (start date if range selection is enabled)

getMonth(): string
get the date string format MM. (start date if range selection is enabled)"

getDay(): string
get the date string format dd. (start date if range selection is enabled)

getSecondDateFormat(): String
get the end date string YYYYMMDD. (returns undefined if range selection is not enabled)

getSecondYear(): string
get the end date string YYYY. (returns undefined if range selection is not enabled)

getSecondMonth(): string
get the end date string MM. (returns undefined if range selection is not enabled)

getSecondDay(): string
get the end date string DD. (returns undefined if range selection is not enabled)

getDateValue(): Date
get date. (start date if range selection is enabled)

setDateValue(dv: Date): void
set date. (start date if range selection is enabled)

getSecondDateValue(): Date
get end date. (returns undefined if range selection is not enabled)

setSecondDateValue(dv: Date): void
set end date. (has no effect if range selection is not enabled)

isRangeEnabled(): boolean
returns whether range selection is enabled

Event Summary
onChange(): void
Called when selected date is changed

*/
