class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return this.head == null;
    }

    insert(data) {
        let newNode = new Node(data);
        this.length += 1;
        if (this.isEmpty()) {
            this.head = newNode
            this.tail = this.head;
        } else {
            let it = this.head;
            while (it.next) {
                it = it.next;
            }
            it.next = newNode;
            newNode.prev = it;
            this.tail = newNode;
        }
    }

    size() {
        return this.length;
    }

    at(index) {
        if (index >= this.length || index < 0) {
            return null;
        } else {
            let i = 0;
            let it = this.head;
            while (i < index) {
                it = it.next;
                i += 1;
            }

            return it.data;
        }
    }

    findNode(data) {
        let it = this.head;
        while (it && it.data !== data) {
            it = it.next;
        }
        return it; 
    }

    toArray() {
        let array = [];
        let it = this.head;
        while (it) {
            array.push(it.data);
            it = it.next;
        }
        return array;
    }

    removeAt(index) {
        if (index < this.length && index >= 0) {
            let i = 0;
            let it = this.head;
            while (i < index) {
                it = it.next;
                i += 1;
            }

            if (it === this.head) {
                if (this.tail === this.head) {
                    this.tail = null;
                    this.head = null;
                } else {
                    this.head = this.head.next;
                    this.head.prev = null;
                }
            } else if (it === this.tail) {
                this.tail.prev.next = null;
                this.tail = this.tail.prev;
            } else {
                let prevNode = it.prev;
                let nextNode = it.next;
                prevNode.next = nextNode;
                nextNode.prevNode = prevNode;

            }

            this.length -= 1;
        }
    }

    /*
    * needs to be tested
    */
    moveToFront(node) {
        if (node !== this.head) {
            if (node === this.tail) {
                let prevNode = this.tail.prev;
                prevNode.next = null;
                this.tail.prev = null;
                this.tail.next = this.head;
                this.head.prev = this.tail;
                this.head = this.tail;
                this.tail = prevNode;
            } else {    
                let nextNode = node.next;
                let prevNode = node.prev;
                node.next = this.head;
                node.prev = null;
                this.head.prev = node;
                this.head = node;
                prevNode.next = nextNode;
                nextNode.prev = prevNode;
            }
        }
    }

    reorganize(data) {
        let node = this.findNode(data);
        if (node === null) {
            return false;
        } else {
            this.moveToFront(node);
            return true;
        }
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};
