import React, { useState } from 'react';

export function StateComp () {

    // useState [ visibility ]
    const[visibility, setVisibility] = useState([]);
    // useState [ inputQtde ]
    const[inputQtde, setInputQtde] = useState(10);
    // return
    return { visibility, setVisibility, inputQtde, setInputQtde }

}