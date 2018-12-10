const { locate } = require("../locate");
const { getAnchors } = require("./anchors");

const devices = new Map();

exports.addRange = (newRange) => {
    const key = newRange.tag;
    if(!getAnchors().has(newRange.anchor)) {
        return;
    }
    if(devices.has(key)) {
         devices.get(key).push({anchor: newRange.anchor, range: newRange.range});
    } else {
        devices.set(key,[{anchor: newRange.anchor, range: newRange.range}]);
    }

    if(devices.get(key).length === 3) {

        const location_data = [];
        devices.get(newRange.tag).forEach(element => {
            const anchor_data = {
                position: getAnchors().get(element.anchor).position,
                distance_cm: element.range
            }

            location_data.push(anchor_data);
        });

        console.log(locate(...location_data));

        devices.delete(key);
    }
};

exports.updateRange = (newRange) => {
    const key = parseInt(newRange.tag);
    const updateAnchorRange = (rangeItem) => {
        if(rangeItem.anchor === parseInt(newRange.anchor))
            rangeItem.range = Number(newRange.range);
        return rangeItem;
    }

    devices.set(key, devices.get(key).map(updateAnchorRange));
}

exports.getRanges = () => devices;
