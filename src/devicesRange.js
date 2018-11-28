const devices = new Map();

exports.addRange = (newRange) => {

    const key = newRange.tag;
    if(devices.has(key)) {
        const alreadyHasRangeFromAnchor = devices.get(key).filter((rangeItem) => rangeItem.anchor === newRange.anchor).length === 1;

        if(alreadyHasRangeFromAnchor) {

            const updateAnchorRange = (rangeItem) => {
                if(rangeItem.anchor === newRange.anchor)
                    rangeItem.range = newRange.range;
                return rangeItem;
            }

            devices.set(key, devices.get(key).map(updateAnchorRange));
        } else {
            devices.get(key).push({anchor: newRange.anchor, range: newRange.range});
        }
    } else {
        devices.set(key,[{anchor: newRange.anchor, range: newRange.range}]);
    }

    if(devices.get(key).length === 3) {
        devices.delete(key);
    }
    
};

exports.getRanges = () => devices;
