

class ListNode {
    constructor(key, val, next) {
        this.key = key;
        this.val = val;
        this.next = next;
    }
}
class HashMap {
    /** Initialize your data structure here. */
    constructor() {
        this.noOfUsers = 101; 
        this.primeMultiplier = 1009;
        this.userList = new Array(this.noOfUsers);
    }
    hashFunction(key) {
        return key * this.primeMultiplier % this.noOfUsers;
    }

    /**
     * @param {number} key 
     * @param {number} value
     * @return {void}
    */
    put(key, val) {
        this.remove(key);
        let hashIndex = this.hashFunction(key);
        let node = new ListNode(key, val, this.userList[hashIndex]);
        this.userList[hashIndex] = node ;
    }

    /**
     * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
     * @param {number} key
     * @return {number}
     */
    get(key) {
        let hashIndex = this.hashFunction(key);
        let node = this.userList[hashIndex];
        for (; node; node = node.next){
            if (node.key === key){
                return node.val;
            } 
        }
            
        return -1;
    }

    /**
     * Removes the mapping of the specified value key if this map contains a mapping for the key 
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        let hashIndex = this.hashFunction(key);
        let node = this.userList[hashIndex];
        if (!node){
            return;
        }
        if (node.key === key) {
            this.userList[hashIndex] = node.next;
        }
        else{
            for (; node.next; node = node.next){
                if (node.next.key === key) {
                    node.next = node.next.next;
                    return;
                }
            }
        }   
     }
};



let map = new HashMap();

map.put(8319485277,"Satvik Shrivas");
map.get(8319485277); // "Satvik Shrivas"

map.get(831948577) //-1 (Not Found)

map.remove(8319485277);

map.get(831948577) //-1 (Not Found)

// To check if values in same hashFunction are working correctly or not
// Remove primeMultiplier from hashFunction() function for easy calculation of hashIndex(Manually)
// take noOfUsers to 100 
map.put(122,"Satvik Shrivas"); // hashIndex = 22
map.put(222,"Sas"); // hashIndex = 22
map.get(222) // "Sas"
map.get(122) // "Satvik Shrivas"
