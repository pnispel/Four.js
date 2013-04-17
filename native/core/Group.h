#ifndef GROUP_H
#define GROUP_H

template <typename Object>
class Group
{  
  public:

    explicit Group( int initSize = 0)
            : theSize( initSize ), theCapacity( initSize + SPARE_CAPACITY )
    { objects = new Object[ theCapacity ]; }
    
    Group(const Group & rhs ): objects(0)
    { operator=(rhs); }

    ~Group()
    { delete [] objects; }

    const Group & operator=(const Group & rhs)
    {
        if(this != &rhs)
        {
            delete[] objects;
            theSize = rhs.size();
            theCapacity = rhs.theCapacity;
            
            objects = new Object[capacity()];
            for(int k = 0; k < size(); k++)
                objects[k] = rhs.objects[k];
            
        }

        return *this;
    }

    void resize(int newSize)
    {
        if(newSize > theCapacity)
            reserve(newSize * 2 + 1);
        theSize = newSize;
    }

    int indexOf( const Object& x ) {

        for ( int i = 0; i < theSize; i++ ) {

            if ( objects[ i ]->id == x->id ) {

                return i;

            }

        }

        return -1;

    }

    void reserve(int newCapacity)
    {
        if(newCapacity < theSize)
            return;

        Object *oldArray = objects;

        objects = new Object[newCapacity];
        for(int k = 0; k < theSize; k++)
            objects[k] = oldArray[k];

        theCapacity = newCapacity;

        delete [] oldArray;
    }

    Object & operator[](int index)
    { return objects[index]; }
    
    const Object& operator[](int index) const
    { return objects[index]; }

    bool empty() const
    { return size() == 0; }
    
    int size() const
    { return theSize; }
    
    int capacity() const
    { return theCapacity; }

    void erase(unsigned int erase_index)                { erase(erase_index,erase_index+1);}
    void erase(unsigned int start, unsigned int end)    /* end NOT inclusive so => [start, end) */
    {
        if (end > theSize)
        {   end     = theSize;
        }
        if (start > end)
        {   start   = end;
        }
        unsigned int dst    = start;
        unsigned int src    = end;
        for(;(src < theSize) && (dst < end);++dst, ++src)
        {
            // Move Elements down;
            objects[dst] = objects[src];
        }
        unsigned int count = start - end;
        for(;count != 0; --count)
        {
            // Remove old Elements
            --theSize;
            // Remember we need to manually call the destructor
            objects[theSize].~Object();
        }
    }


    void push_back(const Object& x)
    {
        if(theSize == theCapacity)
            reserve(2 * theCapacity + 1);
        objects[theSize++] = x;
    }

    void pop_back()
    { theSize--; }

    const Object& back() const
    { return objects[theSize - 1]; }

    typedef Object* iterator;
    typedef const Object* const_iterator;

    iterator begin()
    { return &objects[0]; }
    const_iterator begin() const
    { return &objects[0]; }

    iterator end()
    { return &objects[size() - 1]; }
    const_iterator end() const
    { return &objects[size() - 1]; }

    enum { SPARE_CAPACITY = 16 };  
  private:
    int theSize;
    int theCapacity;
    Object* objects;
};

#endif