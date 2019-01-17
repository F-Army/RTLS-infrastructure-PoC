exports.locate = (...anchor_data) => {
        const A = ( (-2*anchor_data[0].position.x) + (2*anchor_data[1].position.x) );
        const B = ( (-2*anchor_data[0].position.y) + (2*anchor_data[1].position.y) );
        const C = (anchor_data[0].distance_cm*anchor_data[0].distance_cm) - (anchor_data[1].distance_cm*anchor_data[1].distance_cm) - (anchor_data[0].position.x*anchor_data[0].position.x) + (anchor_data[1].position.x*anchor_data[1].position.x) - (anchor_data[0].position.y*anchor_data[0].position.y) + (anchor_data[1].position.y*anchor_data[1].position.y);
        const D = ( (-2*anchor_data[1].position.x) + (2*anchor_data[2].position.x) );
        const E = ( (-2*anchor_data[1].position.y) + (2*anchor_data[2].position.y) );
        const F = (anchor_data[1].distance_cm*anchor_data[1].distance_cm) - (anchor_data[2].distance_cm*anchor_data[2].distance_cm) - (anchor_data[1].position.x*anchor_data[1].position.x) + (anchor_data[2].position.x*anchor_data[2].position.x) - (anchor_data[1].position.y*anchor_data[1].position.y) + (anchor_data[2].position.y*anchor_data[2].position.y);
    
        x = (C*E-F*B) / (E*A-B*D);
        y = (C*D-A*F) / (B*D-A*E);
        return {x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), z: 0};
};
