let devices = [];

exports.addRange = (newRange) => {
    const key = newRange.tag.toString();
    if(devices[key] === undefined) {
        devices[key] = {
            ranges: [],
        }
    }

    if( devices[key]
        .ranges
        .filter((range) => range.anchor === newRange.anchor)
        .length === 0
    ) {
            
            devices[key].ranges.push({anchor: newRange.anchor, range: newRange.range});
        }
};

exports.getRanges = () => devices;

exports.clearAll = () => {
    devices = [];
};