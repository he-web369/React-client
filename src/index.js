import React from 'react';
import {render} from 'react-dom';
import App from "./App";

import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

//读取local中保存的user，保存到内存中
const user =storageUtils.getUser()
memoryUtils.user=user

render(<App/>,document.getElementById('root'))

