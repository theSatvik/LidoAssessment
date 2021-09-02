/**
 * The get() method is fairly easy, then. We just hashFunction() our key, access the corresponding bucket in our hashmap array (data), and navigate through the linked list (if necessary) and return the correct val, or -1 if the key is not found.

For the put() method, we should first remove() any earlier instance of that key to avoid chaining multiple versions of a key definition in our linked list. Then we simply form a new ListNode at the head of the proper hashmap bucket, pushing any others back.

The remove() method will be similar to the get() method, except that we need to find and stitch together the nodes on either side of the node that matches the key, removing it from the linked list entirely.
 */

class ListNode {
    constructor(key, val, next) {
        this.key = key;
        this.val = val;
        this.next = next;
    }
}
class HashMap {
    /** Initialize your data structure here. */
    constructor(noOfUsers = 101, primeMultiplier = 1009) {
        this.noOfUsers = noOfUsers; 
        this.primeMultiplier = primeMultiplier;
        this.userList = new Array(this.noOfUsers);
    }
    addMoreUsers(newSizeUsers){
        let listSize = this.noOfUsers;
        if(newSizeUsers <= listSize){
            return ;
        }
        
        let findPower = Math.ceil(newSizeUsers/listSize);
        let findTwoPow = Math.log2(findPower);
        findTwoPow = Math.ceil(findTwoPow);
        let toAllocate = Math.pow(2,findTwoPow) * listSize - listSize;

        console.log(findPower, findTwoPow, toAllocate);

        this.userList=this.userList.concat(new Array(toAllocate));
        
        console.log(this.userList);

        let N = this.noOfUsers;
        this.noOfUsers = this.userList.length;

        //Rehashing previous values for equal distribution
        for(let i = 0;i < N;i++){
            if(this.userList[i] === undefined) {
                continue;
             }

            let node = this.userList[i];
            for (; node ; node = node.next){
                if (node.key >= N){
                    this.remove(node.key, N);
                    this.put(node.key, node.val);
                } 
            }
        }

    }
    hashFunction(key, size=this.noOfUsers) {
        // return key * this.primeMultiplier % size; Prime Multiplier is used to reduce the number of collisions.
        return key % size;
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
        if(this.userList[hashIndex] === undefined) {
            return -1;
        }
        let node = this.userList[hashIndex];
        for (; node ; node = node.next){
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
    remove(key, size=this.noOfUsers) {
        let hashIndex = this.hashFunction(key,size);
        if(this.userList[hashIndex] === undefined) {
            return ;
        }
        let node = this.userList[hashIndex];
        
        if (node.key === key) {
            this.userList[hashIndex] = node.next;
        }
        else{
            for (; node.next ; node = node.next){
                if (node.next.key === key) {
                    node.next = node.next.next;
                    return;
                }
            }
        }   
     }
};



let map = new HashMap(10);

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
map.get(322) // "Hello world"
map.get(322) // "Hello world"


//Testing addMoreUsers


//Test 1
let map = new HashMap(10);


map.put(82,"James")
map.put(162,"Berlin")

map.get(82)     //"James"
map.get(162)    //"Berlin"

map.addMoreUsers(100);
/** 
 *  Old_Size = 10
 *  PowOfTwo (2 ^ i) * Old_Size = New_Size
 *  PowOfTwo (2 ^ i) = New_Size / Old_Size
 *  
 *  i = Log(New_Size/Old_Size) / Log(2); 
 *  
 *  i.e
 *   i = Log(100/10)/Log(2)
 *   i = Log(10)/Log(2) = 3.322 ~ 4 (Take ceil to allocate)
 *   
 *   
 *  Now, 
 * New_Size =(2 ^ i) * Old_Size;
 *   
 * New_Size = 16*(10) = 160 
 * Already allocated = 10 
 *  
 *  To Allocate = 160 - 10 = 150
 */

//Test 2
let map = new HashMap();
map.put(122,"Berlin");

map.addMoreUsers(33); //(40) [empty × 2, ListNode, empty × 37]

map.put(82,"James") 

map.userList
/**
 * (40) [empty × 2, ListNode, empty × 37]
2: ListNode
key: 82
next: ListNode {
    key: 122,
    val: "Berlin",
    next: undefined
}
val: "James"
[[Prototype]]: Object
length: 40
[[Prototype]]: Array(0)
 */

