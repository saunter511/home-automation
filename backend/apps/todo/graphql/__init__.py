import graphene
from graphene_subscriptions.events import CREATED

from ..models import Todo
from .types import TodoType


class Query(graphene.ObjectType):
    todos = graphene.List(TodoType)

    def resolve_todos(self, info, **kwargs):
        return Todo.objects.order_by("timestamp")


class Subscription(graphene.ObjectType):
    todo_created = graphene.Field(TodoType)

    def resolve_todo_created(root, info):
        def handler(ev):
            return ev.operation == CREATED and isinstance(ev.instance, Todo)

        return root.filter(handler).map(lambda event: event.instance)


class CreateTodo(graphene.Mutation):
    class Arguments:
        content = graphene.String()

    ok = graphene.Boolean()

    def mutate(root, info, content):
        desc = Todo(description=content)
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


class DeleteTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        todo = Todo.objects.filter(id=id)
        todo.delete()

        return DeleteTodo(ok=True)


class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    toggle_todo = ToggleTodo.Field()
    delete_todo = DeleteTodo.Field()
