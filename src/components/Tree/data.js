const random_item = () => {
    const rnd = 10 + parseInt(Math.random() * 100);
    return {
        id: 'id' + rnd,
        title: 'Item 3-' + rnd,
        parent: 'id3',
        expanded: false,

    }
}

const random_item2 = () => {
    const rnd = 10 + parseInt(Math.random() * 100);
    return {
        id: 'id' + rnd,
        title: 'Item ' + rnd,
        parent: null,
        expanded: false,

    }
}

export const example_generators = {
    'push': random_item,
    'push_front': random_item2,
    'replace': () => {
        const rnd = 10 + parseInt(Math.random() * 100);
        return {
            id: 'replace_value',
            title: 'Replaced item ' + rnd,
            expanded: true,
            parent: null
        }
    }
}


export const example_tree_array_items = [
    {
        id: 'id0',
        title: 'Root item',
        expanded: true,
        parent: null,
        type: 'root',
        drop: {
            allow: ['trunk'],
            deny: ['leaf'],
        }
    },
    {
        id: 'id1',
        title: 'Item 1',
        subtitle: 'Item 1 subtitle',
        expanded: false,
        disabled: false,
        parent: 'id0',
        type: 'trunk',
        drop: {
            allow: ['branch'],
        }
    },
    {
        id: 'id11',
        title: 'Item 1-1',
        subtitle: 'Item 1-1 subtitle',
        parent: 'id1',
        type: 'branch',
        drop: {
            allow: ['leaf', 'branch'],
        }
    },
    {
        id: 'id2',
        title: 'Item 2',
        expanded: true,
        disabled: false,
        parent: 'id0',
        type: 'trunk',
        drop: {
            allow: ['branch'],
        }

    },
    {
        id: 'id22',
        title: 'Item 2-1',
        expanded: true,
        parent: 'id2',
        type: 'branch',
        drop: {
            allow: ['leaf', 'branch'],
        }
    },
    {
        id: 'delete_value',
        title: 'Item 2-2 (delete)',
        expanded: true,
        parent: 'id2',
        type: 'branch',
        drop: {
            allow: ['leaf', 'branch'],
        }
    },
    {
        id: 'select_value',
        title: 'Item 2-3 (select)',
        expanded: true,
        parent: 'id2',
        type: 'branch',
        drop: {
            allow: ['leaf', 'branch'],
        }
    },
    {
        id: 'replace_value',
        title: 'Item 2-4 (replace)',
        expanded: true,
        parent: 'id2',
        type: 'branch',
        drop: {
            allow: ['leaf', 'branch'],
        }
    },
    {
        id: 'id3',
        title: 'Item 3',
        disabled: false,
        expanded: true,
        parent: 'id0',
        type: 'trunk',
        drop: {
            allow: ['branch'],
        }
    },
    {
        id: 'id31',
        title: 'Item 3-1',
        expanded: true,
        parent: 'id3',
        type: 'branch',
        drop: {
            allow: ['leaf', 'branch'],
        }
    },
];

