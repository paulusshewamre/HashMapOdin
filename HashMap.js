class HashMap{
    constructor(initial_capacity=16){
        this.capacity =initial_capacity;
        this.size = 0;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key){
        let hashCode = 0;
        const keyString = String(key);
        for(let i=0;i<keyString.length;i++){
            hashCode = 31 * hashCode + keyString.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }

    resize(){
        this.capacity *=  2;
        const newBuckets = new Array(this.capacity).fill(null);
        for(const bucket in this.buckets){
            if(bucket){
                for(const [key, value] of bucket){
                    const index = this.hash(key);
                    if(!newBuckets[index]){
                        newBuckets[index] = [];
                    }
                    newBuckets[index].push([key, value]);
                }
            }
        }
        this.buckets = newBuckets;
    }

    set(key, value){
        let index = this.hash(key);

        if(!this.buckets[index]){
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];
        const isFound = bucket.find(item => item[0] === value);

        if(isFound){
            isFound[1] = value;
        }else{
            bucket.push([key, value]);
            this.size++;
            if(this.size / this.capacity > this.loadFactor){
                this.resize();
            }
        }
    }

    get(key){
        const index = this.hash(key);
        const bucket = this.buckets[key];

        if(bucket){
            const item = bucket.find(item => item[0] === key);
            return item ? item[1] : undefined;
        }
        return undefined;
    }
    delete(key){
        const index = this.hash(key);
        const bucket = this.buckets[key];

        if(bucket){
            const iSize= bucket.length;
            this.buckets[index] = bucket.filter(item => item[0] !== key);
            if(this.buckets[index].length < iSize){
                this.size--;
                return true;
            }
        }
        return false
    }

    clear(){
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    getSize = () => this.size;

    getKeys(){
        let keys = [];
        for(const bucket in this.buckets){
            if(bucket){
                for(const [key] in bucket){
                    keys.push(key);
                }
            }
        }
        return keys;
    }

    getValues(){
        let values = [];
        for(const bucket in this.buckets){
            if(bucket){
                for(const [ ,value] in bucket){
                    values.push(value);
                }
            }
        }
        return values;
    }

    print(){
        for(let i=0;i<this.capacity;i++){
            if(this.buckets[i]){
                console.log(`Bucket ${i}`, this.buckets[i]);
            }
        }
    }
}


let test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


console.log('size: ' + test.getSize());
test.print();