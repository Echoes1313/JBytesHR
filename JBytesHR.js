(function(obj) {
    /**
     *
     *
     */
    obj.JBytesHR = function() {
        var decimalPlaces = 2;

        var kiloBytes = 1024, kiloBytesBase10 = 1000;
        var megaBytes = Math.pow(1024, 2), megaBytesBase10 = Math.pow(1000, 2);
        var gigaBytes = Math.pow(1024, 3), gigaBytesBase10 = Math.pow(1000, 3);
        var teraBytes = Math.pow(1024, 4), teraBytesBase10 = Math.pow(1000, 4);
        var pedaBytes = Math.pow(1024, 5), pedaBytesBase10 = Math.pow(1000, 5);
        var exaBytes = Math.pow(1024, 6), exaBytesBase10 = Math.pow(1000, 6);

        var kbAbbrv = 'kB', kbWord = 'kilobytes';
        var mbAbbrv = 'MB', mbWord = 'megabytes';
        var gbAbbrv = 'GB', gbWord = 'gigabytes';
        var tbAbbrv = 'TB', tbWord = 'terabytes';
        var pbAbbrv = 'PB', pbWord = 'pedabytes';
        var ebAbbrv = 'EB', ebWord = 'exabytes';

        /**
         * Shorthand method for converting bytes to the largest unit greater than one possible,
         *    to the default decimal places.
         * @param incomingBytes The integer of bytes to be converted.
         */
        this.convert = function(incomingBytes) {
            return this.convertBytesToHumanReadable(incomingBytes, decimalPlaces, true, false);
        };
        
        /**
         * Main method for converting a number of bytes to more readable units.
         * @param incomingBytes The integer of bytes to be converted.
         * @param desiredDecimalPlaces How many decimal places to preserver. Extra zeroes will be truncated.
         * @param useAbbreviations Whether or not to output 'kB' or 'kilobytes'
         * @param useBase10 Whether or not to use powers of 10 instead of 2. (see http://en.wikipedia.org/wiki/Megabyte#Definition)
         */
        this.convertBytesToHumanReadable = function(incomingBytes, desiredDecimalPlaces, useAbbreviations, useBase10) {
            var kB = (useBase10===true ? kiloBytesBase10 : kiloBytes);
            var mB = (useBase10===true ? megaBytesBase10 : megaBytes);
            var gB = (useBase10===true ? gigaBytesBase10 : gigaBytes);
            var tB = (useBase10===true ? teraBytesBase10 : teraBytes);
            var pB = (useBase10===true ? pedaBytesBase10 : pedaBytes);
            var eB = (useBase10===true ? exaBytesBase10    : exaBytes);

            var mFactor = Math.pow(10, (!desiredDecimalPlaces ? decimalPlaces : desiredDecimalPlaces));
            var resultString = '';

            if (isNaN(incomingBytes) || incomingBytes < 0) {
                resultString = 'Invalid size argument: ' + incomingBytes;
            } else if (incomingBytes < kB) {
                resultString = incomingBytes + ' ' + (useAbbreviations===true?'B':'bytes');
            } else if (incomingBytes >= kB && incomingBytes < mB) {
                var value = Math.round(incomingBytes/kB*mFactor)/mFactor;
                resultString = value + ' ' + (useAbbreviations===true?'kB':'kilobytes');
            } else if (incomingBytes >= mB && incomingBytes < gB) {
                var value = Math.round(incomingBytes/mB*mFactor)/mFactor;
                resultString = value + ' ' + (useAbbreviations===true?'MB':'megabytes');
            } else if (incomingBytes >= gB && incomingBytes < tB) {
                var value = Math.round(incomingBytes/gB*mFactor)/mFactor;
                resultString = value + ' ' + (useAbbreviations===true?'GB':'gigabytes');
            } else if (incomingBytes >= tB && incomingBytes < pB) {
                var value = Math.round(incomingBytes/tB*mFactor)/mFactor;
                resultString = value + ' ' + (useAbbreviations===true?'TB':'terabytes');
            } else if (incomingBytes >= pB && incomingBytes < eB) {
                var value = Math.round(incomingBytes/pB*mFactor)/mFactor;
                resultString = value + ' ' + (useAbbreviations===true?'PB':'pedabytes');
            } else if (incomingBytes >= eB) {
                var value = Math.round(incomingBytes/eB*mFactor)/mFactor;
                resultString = value + ' ' + (useAbbreviations===true?'EB':'exabytes');
            } else {
                throw 'Invalid input: '+incomingBytes;
            }
            return resultString;
        };
    };
} (this));
