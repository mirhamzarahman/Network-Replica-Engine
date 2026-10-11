/**
 * Network Replica Engine
 *
 * Creates an independent deep copy of a connected network graph.
 * Uses DFS traversal and node mapping to preserve relationships.
 */

class NetworkNode {
    constructor(value) {
        this.value = value;
        this.connections = [];
    }
}

/**
 * Creates a deep replica of a network.
 *
 * @param {NetworkNode} rootNode
 * @returns {NetworkNode|null}
 */
function createNetworkReplica(rootNode) {
    if (!rootNode) {
        return null;
    }

    const replicaMap = new Map();

    function replicateNode(currentNode) {
        // Return existing replica if already created
        if (replicaMap.has(currentNode)) {
            return replicaMap.get(currentNode);
        }

        // Create a new independent node
        const clonedNode = new NetworkNode(currentNode.value);

        // Store mapping before exploring connections
        replicaMap.set(currentNode, clonedNode);

        // Replicate connected nodes
        for (const connection of currentNode.connections) {
            clonedNode.connections.push(replicateNode(connection));
        }

        return clonedNode;
    }

    return replicateNode(rootNode);
}


// Example Usage

const serverA = new NetworkNode(1);
const serverB = new NetworkNode(2);
const serverC = new NetworkNode(3);

serverA.connections.push(serverB);
serverB.connections.push(serverA, serverC);
serverC.connections.push(serverB);

const replicatedNetwork = createNetworkReplica(serverA);

console.log(replicatedNetwork);
