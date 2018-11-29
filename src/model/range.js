const Joi = require("joi");
const { locate } = require("../locate");
const { getAnchors } = require("../anchors");

const devices = new Map();


exports.rangeSchema = Joi.object().keys({
    anchor: Joi.number().min(0).max(65535).required(),
    tag:    Joi.number().min(0).max(65535).required(),
    range:  Joi.number().positive().required(),
});

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

exports.getRanges = () => devices;
