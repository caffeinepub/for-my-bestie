import Map "mo:core/Map";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    author : Text;
    text : Text;
    timestamp : Int;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Int.compare(message2.timestamp, message1.timestamp);
    };
  };

  let messages = Map.empty<Int, Message>();

  public shared ({ caller }) func addMessage(author : Text, text : Text) : async () {
    let id = Time.now();
    if (messages.containsKey(id)) { Runtime.trap("Message was already sent. Try again.") };

    let message : Message = {
      author;
      text;
      timestamp = id;
    };
    messages.add(id, message);
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.values().toArray().sort();
  };
};
