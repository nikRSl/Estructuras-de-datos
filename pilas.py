class Reality:
    def __init__(self, level, description):
        self.level = level
        self.description = description

    def get_info(self):
        return f"Level {self.level}: {self.description}"


class RealityStack:
    def __init__(self):
        self.realities = []

    def enter_reality(self, reality):
        self.realities.append(reality)

    def exit_reality(self):
        if self.is_empty():
            return None
        return self.realities.pop()
    
    def current_reality(self):
        if self.is_empty():
            return None
        return self.realities[-1]
    
    def is_empty(self):
        return len(self.realities) == 0
    

class DreamSimulator:

    def __init__(self):
        self.dream_stack = RealityStack()
        self.level = 0

    def descend(self, description):
        self.level += 1
        reality = Reality(self.level, description=description)
        self.dream_stack.enter_reality(reality)
        print(f"Entering {reality.get_info()}")

    def ascend(self):
        reality = self.dream_stack.exit_reality()
        if reality:
            print(f"Exiting {reality.get_info()}")
            self.level -= 1
        else:
            print("You are already awake in the main reality.")

    def show_state(self):
        current = self.dream_stack.current_reality()
        if current:
            print(f"Current reality: {current.get_info()}")
        else:
            print("You are in the main reality.")


# Example usage
if __name__ == "__main__":
    dream = DreamSimulator()
    dream.descend("your favorite place")  
    dream.descend("your favorite moment")  
    dream.descend("a very dark place")  

    dream.show_state() 
    dream.ascend() 
    dream.show_state()  
    dream.ascend()  
    dream.ascend()  
    dream.ascend()

    
