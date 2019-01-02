const { locate } = require("../locate");
const { getAnchors } = require("./anchors");
const { SlmfHttpConnector, BatteryStatus, TagIdFormat } = require("slmf-http-connector");

const devices = new Map();


const connector = new SlmfHttpConnector({
    accumulationPeriod : 500,
    maxAccumulatedMessages : 3,
    maxSlmfMessages : 2,
    maxRetries: 3,
    port: 3001,
    url : "http://127.0.0.1",
});


exports.addRange = (newRange) => {
    const key = newRange.tag;
    if(!getAnchors().has(newRange.anchor)) {
        console.log("No anchor");
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

        if(!connector.isRunning()) {
            console.log("Started connector");
            connector.start();
        }
        
        const position = locate(...location_data);
        console.log(position);

        connector.addMessages({
            source: "Infrastructure",
            format: "DFT",
            tagIdFormat: TagIdFormat.IEEE_EUI_64,
            tagId: key, // eui is assumed to be short address
            position,
            battery: BatteryStatus.Unknown,
            timestamp: new Date(),
        });
        
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
