(function(obj) {
    /**
     *
     *
     */
    obj.JBytesHR = function(decimalPlaces, useFullWord, useBase10) {
        
        this.usingBase10    = useBase10 === true;
        this.usingFullWord     = useFullWord === true;
        this.decimalPlaces  = (decimalPlaces % 1 === 0 ? decimalPlaces : 2)
        var converter       = this;
        
        function ByteUnit(intPower, abbrv, word) {
            this.base2  = Math.pow(1024, intPower);
            this.base10 = Math.pow(1000, intPower);
            this.abbrv  = abbrv;
            this.word   = word;
        }

        ByteUnit.prototype.getBytes = function() {
            if (converter.usingBase10) {
                return this.base10;
            } else {
                return this.base2;
            }
        }

        ByteUnit.prototype.getText = function() {
            if (converter.usingFullWord) {
                return this.word;
            } else {
                return this.abbrv;
            }
        }

        var unitLib = {
             b: new ByteUnit(0, 'b',  'bytes'),
            kb: new ByteUnit(1, 'kB', 'kilobytes'),
            mb: new ByteUnit(2, 'mB', 'kilobytes'),
            gb: new ByteUnit(3, 'gB', 'gigabytes'),
            tb: new ByteUnit(4, 'tB', 'terabytes'),
            pb: new ByteUnit(5, 'pB', 'pedabytes'),
            eb: new ByteUnit(6, 'eB', 'exabytes')
        }

        /**
         * Shorthand/convenience method for convertBytesToHumanReadable
         * @param incomingBytes The integer of bytes to be converted.
         */
        this.convert = function(incomingBytes) {
            return this.convertBytesToHumanReadable(incomingBytes);
        };
        
        /**
         * Main method for converting a number of bytes to the largest unit greater than one possible.
         * @param incomingBytes The integer of bytes to be converted.
         */
        this.convertBytesToHumanReadable = function(incomingBytes) {

            var mFactor = Math.pow(10, this.decimalPlaces);
            var resultKey = '';

            if (isNaN(incomingBytes) || incomingBytes < 0) {
                return resultString = 'Invalid size argument: ' + incomingBytes;
            } else if (incomingBytes < unitLib.kb.getBytes()) {
                resultKey = 'b';
            } else if (incomingBytes >= unitLib.kb.getBytes() && incomingBytes < unitLib.mb.getBytes()) {
                resultKey = 'kb';
            } else if (incomingBytes >= unitLib.mb.getBytes() && incomingBytes < unitLib.gb.getBytes()) {
                resultKey = 'mb';
            } else if (incomingBytes >= unitLib.gb.getBytes() && incomingBytes < unitLib.tb.getBytes()) {
                resultKey = 'gb';
            } else if (incomingBytes >= unitLib.tb.getBytes() && incomingBytes < unitLib.pb.getBytes()) {
                resultKey = 'tb';
            } else if (incomingBytes >= unitLib.pb.getBytes() && incomingBytes < unitLib.eb.getBytes()) {
                resultKey = 'pb';
            } else if (incomingBytes >= unitLib.eb.getBytes()) {
                resultKey = 'eb';
            } else {
                throw 'Invalid input: '+incomingBytes;
            }
            
            var value = Math.round(incomingBytes/unitLib[resultKey].getBytes()*mFactor) / mFactor;
            var text = unitLib[resultKey].getText();
            return value + ' ' + text;
        };
    };
} (this));
