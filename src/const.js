const Status = {
    BACKLOG: `backlog`,
    IN_PROGRESS: `in-progress`,
    DONE: `done`,
    BASKET: `basket`
};

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.IN_PROGRESS]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BASKET]: `Корзина`
};


const OrderPosition = { 
    START: `start`,
    END: `end`,
    BELOW: `below`,
    ABOVE: `above`
}

export {Status, StatusLabel, OrderPosition};