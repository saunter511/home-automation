import graphene
from graphene_subscriptions.events import CREATED

from ..models import Todo
from .types import TodoType


class Query(graphene.ObjectType):
    todos = graphene.List(TodoType)

    def resolve_todos(self, info, **kwargs):
        return Todo.objects.order_by("timestamp")[:100][::-1]


class CreateTodo(graphene.Mutation):
    class Arguments:
        description = graphene.String()

    ok = graphene.Boolean()

    def mutate(root, info, description):
        desc = Todo(description=description)
        desc.save()

        return CreateTodo(ok=True)


class ToggleTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        
    ok = graphene.Boolean()

    def mutate(root, info, id):
        todo = Todo.objects.get(id=id) 
        todo.completed = not todo.completed
        todo.save()
           
        return ToggleTodo(ok=True)



class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    toggle_todo = ToggleTodo.Field()




